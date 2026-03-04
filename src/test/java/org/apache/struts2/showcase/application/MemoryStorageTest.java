package org.apache.struts2.showcase.application;

import org.apache.struts2.showcase.exception.CreateException;
import org.apache.struts2.showcase.exception.DuplicateKeyException;
import org.apache.struts2.showcase.exception.StorageException;
import org.apache.struts2.showcase.exception.UpdateException;
import org.apache.struts2.showcase.model.IdEntity;
import org.apache.struts2.showcase.model.Skill;
import org.junit.Before;
import org.junit.Test;

import java.util.Collection;

import static org.junit.Assert.*;

/**
 * Unit tests for MemoryStorage, verifying Java 8 modernized code
 * including computeIfAbsent, diamond operator, and Collections.emptyList().
 */
public class MemoryStorageTest {

	private MemoryStorage storage;

	@Before
	public void setUp() {
		storage = new MemoryStorage();
	}

	@Test
	public void testCreateAndGet() throws Exception {
		Skill skill = new Skill("JAVA", "Java Developer");
		storage.create(skill);

		IdEntity retrieved = storage.get(Skill.class, "JAVA");
		assertNotNull(retrieved);
		assertTrue(retrieved instanceof Skill);
		assertEquals("JAVA", ((Skill) retrieved).getName());
	}

	@Test(expected = CreateException.class)
	public void testCreateNullObjectThrowsException() throws Exception {
		storage.create(null);
	}

	@Test(expected = DuplicateKeyException.class)
	public void testCreateDuplicateThrowsException() throws Exception {
		Skill skill = new Skill("JAVA", "Java Developer");
		storage.create(skill);
		storage.create(skill);
	}

	@Test
	public void testUpdate() throws Exception {
		Skill skill = new Skill("JAVA", "Java Developer");
		storage.create(skill);

		Skill updated = new Skill("JAVA", "Senior Java Developer");
		IdEntity result = storage.update(updated);
		assertNotNull(result);
		assertEquals("Senior Java Developer", ((Skill) result).getDescription());
	}

	@Test(expected = UpdateException.class)
	public void testUpdateNonExistentThrowsException() throws Exception {
		Skill skill = new Skill("NONEXISTENT", "Does not exist");
		storage.update(skill);
	}

	@Test
	public void testMergeCreatesNewObject() throws Exception {
		Skill skill = new Skill("PYTHON", "Python Developer");
		storage.merge(skill);

		IdEntity retrieved = storage.get(Skill.class, "PYTHON");
		assertNotNull(retrieved);
	}

	@Test
	public void testMergeUpdatesExistingObject() throws Exception {
		Skill skill = new Skill("PYTHON", "Python Developer");
		storage.create(skill);

		Skill updated = new Skill("PYTHON", "Senior Python Developer");
		storage.merge(updated);

		IdEntity retrieved = storage.get(Skill.class, "PYTHON");
		assertEquals("Senior Python Developer", ((Skill) retrieved).getDescription());
	}

	@Test(expected = StorageException.class)
	public void testMergeNullThrowsException() throws Exception {
		storage.merge(null);
	}

	@Test
	public void testDelete() throws Exception {
		Skill skill = new Skill("JAVA", "Java Developer");
		storage.create(skill);

		int deleted = storage.delete(Skill.class, "JAVA");
		assertEquals(1, deleted);
		assertNull(storage.get(Skill.class, "JAVA"));
	}

	@Test
	public void testDeleteNonExistentReturnsZero() throws Exception {
		int deleted = storage.delete(Skill.class, "NONEXISTENT");
		assertEquals(0, deleted);
	}

	@Test
	public void testDeleteByObject() throws Exception {
		Skill skill = new Skill("JAVA", "Java Developer");
		storage.create(skill);

		int deleted = storage.delete(skill);
		assertEquals(1, deleted);
	}

	@Test
	public void testFindAll() throws Exception {
		Skill skill1 = new Skill("JAVA", "Java Developer");
		Skill skill2 = new Skill("PYTHON", "Python Developer");
		storage.create(skill1);
		storage.create(skill2);

		Collection<IdEntity> all = storage.findAll(Skill.class);
		assertNotNull(all);
		assertEquals(2, all.size());
	}

	@Test
	public void testFindAllWithNullClassReturnsEmptyList() {
		Collection<IdEntity> result = storage.findAll(null);
		assertNotNull(result);
		assertTrue(result.isEmpty());
	}

	@Test
	public void testGetWithNullClassReturnsNull() {
		assertNull(storage.get(null, "id"));
	}

	@Test
	public void testGetWithNullIdReturnsNull() {
		assertNull(storage.get(Skill.class, null));
	}

	@Test
	public void testReset() throws Exception {
		Skill skill = new Skill("JAVA", "Java Developer");
		storage.create(skill);

		storage.reset();
		assertNull(storage.get(Skill.class, "JAVA"));
	}
}
